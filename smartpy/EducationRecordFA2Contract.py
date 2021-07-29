import smartpy as sp


class ErrorMessageFactory:
    def __init__(self):
        self.prefix = "FA2_"

    def make(self, s):
        return self.prefix + s

    def token_undefined(self):
        return self.make("TOKEN_UNDEFINED")

    def operators_unsupported(self):
        return self.make("OPERATORS_UNSUPPORTED")

    def transaction_denied(self):
        return self.make("FA2_TX_DENIED")


token_id_type = sp.TNat

class BalanceOf:

    def request_type():

        return sp.TRecord(
            owner = sp.TAddress,
            token_id = token_id_type
        ).layout(("owner", "token_id"))

    def response_type():
        return sp.TList(
            sp.TRecord(
                request = BalanceOf.request_type(),
                balance = sp.TNat
            ).layout(("request", "balance"))
        )

    def entry_point_type():
        return sp.TRecord(
            callback = sp.TContract(BalanceOf.response_type()),
            requests = sp.TList(BalanceOf.request_type())
        ).layout(("requests", "callback"))

class OperatorParam:

    def get_type(self):
        return sp.TRecord(
            owner = sp.TAddress,
            operator = sp.TAddress,
            token_id = token_id_type).layout(("owner", ("operator", "token_id")))

    def make(self, owner, operator, token_id):
        r = sp.record(owner = owner,
                      operator = operator,
                      token_id = token_id)
        return sp.set_type_expr(r, self.get_type())

class BatchTransfer:

    def get_transfer_type(self):
        tx_type = sp.TRecord(to_=sp.TAddress,
                             token_id=token_id_type,
                             amount=sp.TNat).layout(
            ("to_", ("token_id", "amount"))
        )
        transfer_type = sp.TRecord(from_=sp.TAddress,
                                   txs=sp.TList(tx_type)).layout(
            ("from_", "txs"))
        return transfer_type

    def get_type(self):
        return sp.TList(self.get_transfer_type())

    def item(self, from_, txs):
        v = sp.record(from_=from_, txs=txs)
        return sp.set_type_expr(v, self.get_transfer_type())


class FA2EducationRecord(sp.Contract):

    def __init__(self, name, symbol, record_metadata_uri, admin_address, educator_address, recipient_address):

        # Contract level metadata
        metadata_base = {
            "description": "Certification Record",
            "interfaces": ["TZIP-012", "TZIP-016"],
            "permissions": {
                "operator": "no-transfer", # No transfers of balance are allowed
                "receiver": "owner-no-hook",
                "sender": "owner-no-hook"
            }
        }
        self.init_metadata("metadata_base", metadata_base)
        # Helper to create errors
        self.error_message_factory = ErrorMessageFactory()


        self.batch_transfer = BatchTransfer()
        self.operator_param = OperatorParam()

        self.init(
            # Token level metadata - one record token per contract
            token_metadata = sp.big_map({
                sp.nat(0): {
                    "name": sp.utils.bytes_of_string(name),
                    "symbol": sp.utils.bytes_of_string(symbol),
                    "decimals": sp.utils.bytes_of_string("0"),
                    "record_metadata_uri": sp.utils.bytes_of_string(record_metadata_uri)
                }
            }),
            # Recipient of the record
            recipient = recipient_address,
            # Global admin
            admin_address = admin_address,
            # Educator - has access to revoke a record (not yet implemented)
            educator_address = educator_address,
            # Whether record is currently valid (i.e. not revoked)
            is_valid = sp.bool(True),
            # Timestamp of verification record
            timestamp = sp.timestamp_from_utc_now(),
        )

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, self.batch_transfer.get_type())
        sp.failwith(self.error_message_factory.transaction_denied())

    @sp.entry_point
    def balance_of(self, params):
        sp.set_type(params, BalanceOf.entry_point_type())

        def __process_balance_of_req(req):
            sp.verify(req.token_id == 0, message=self.error_message_factory.token_undefined())

            sp.if self.data.recipient == req.owner:
                sp.result(
                    sp.record(
                        request=sp.record(
                            owner=sp.set_type_expr(req.owner, sp.TAddress),
                            token_id=sp.set_type_expr(req.token_id, sp.TNat)
                        ),
                        balance=1
                    )
                )
            sp.else:
                sp.result(
                    sp.record(
                        request=sp.record(
                            owner=sp.set_type_expr(req.owner, sp.TAddress),
                            token_id=sp.set_type_expr(req.token_id, sp.TNat)),
                        balance=0
                    )
                )

        # Process all requests
        res = sp.local("responses", params.requests.map(__process_balance_of_req))

        # Send the callbacks to the destinations
        destination = sp.set_type_expr(params.callback, sp.TContract(BalanceOf.response_type()))
        sp.transfer(res.value, sp.mutez(0), destination)

    @sp.entry_point
    def update_operators(self, params):
        sp.set_type(params, sp.TList(
            sp.TVariant(
                add_operator = self.operator_param.get_type(),
                remove_operator = self.operator_param.get_type()
            )
        ))
        sp.failwith(self.error_message_factory.operators_unsupported())


class BalanceOfConsumer(sp.Contract):
    def __init__(self, contract):
        self.contract = contract
        self.init(total_balance = 0)

    @sp.entry_point
    def reinit(self):
        self.data.total_balance = 0

    @sp.entry_point
    def receive_balances(self, params):
        sp.set_type(params, BalanceOf.response_type())
        self.data.total_balance = 0
        sp.for resp in params:
            self.data.total_balance += resp.balance


@sp.add_test(name='Basic Contract Test')
def basic_contract_test():
    scenario = sp.test_scenario()
    scenario.h1("Basic Contract Tests for Certificate Record")

    admin = sp.test_account("Administrator")
    educator = sp.test_account("Educator")
    student = sp.test_account("Student")

    contract = FA2EducationRecord(
        "Test Record",
        "TestRecord1",
        "",
        admin.address,
        educator.address,
        student.address
    )
    scenario += contract

    scenario.h2("Transfers Not Available")
    contract.transfer(
        [
            contract.batch_transfer.item(
                from_=educator.address,
                txs=[
                    sp.record(to_=student.address,
                              amount=1,
                              token_id=0)
                ]
            )
        ]).run(sender=educator, valid=False)

    scenario.h2("Operator Methods Not Available")
    contract.update_operators([
        sp.variant("add_operator", contract.operator_param.make(
            owner=student.address,
            operator=educator.address,
            token_id=0)),
    ]).run(sender=admin, valid=False)

    scenario.h2("Consumer Contract for balance_of Call")

    consumer = BalanceOfConsumer(contract)
    scenario += consumer

    scenario.p("Consumer virtual address: "
               + consumer.address.export())

    def arguments_for_balance_of(receiver, reqs):
        return (sp.record(
            callback=sp.contract(
                BalanceOf.response_type(),
                receiver.address,
                entry_point="receive_balances").open_some(),
            requests=reqs))

    contract.balance_of(arguments_for_balance_of(consumer, [
        sp.record(owner=student.address, token_id=0),
    ]))
    scenario.verify(consumer.data.total_balance == 1)
