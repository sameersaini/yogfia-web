import * as React from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import dayjs from 'dayjs'
import {AppDispatch, RootState} from "../../redux/store";
import {cancelSubscription, PlanObj, SubscriptionState} from "../../redux/slices/subscriptionSlice";
import {hideModal, showModal} from "../../redux/slices/appModalSlice";

const Billing: React.FC = () => {
    const {subscriptions, plans, invoices} = useSelector<RootState, SubscriptionState>(state => state.subscription);
    // @ts-ignore
    let activePlan: PlanObj = {};
    const latestSubscription = subscriptions[0] ?? {};
    if (Object.keys(latestSubscription).length > 0 && Object.keys(plans).length > 0 && plans[latestSubscription.plan_id]) {
        activePlan = plans[latestSubscription.plan_id];
    }

    const dateFormatStr = 'D MMM YYYY'
    const dateTimeFormatStr = 'D MMM YYYY hh:mm a'
    return (
        <Container className="mt-5 user-profile-container">
            <Row className="shadow-lg mx-5 p-4 user-profile-container-top-row">
                <h5>Subscription</h5>
                <Row className="m-0 p-0">
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Plan</label>
                        <div>
                            {activePlan.name} {activePlan.period ? `(${activePlan.period})` : ''}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Status</label>
                        <div style={{textTransform: "capitalize"}}>
                            {latestSubscription.status} <SubscriptionActiveButtons status={latestSubscription.status}
                                                                                   subsId={latestSubscription.id}/>
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Amount</label>
                        <div>
                            &#8377;{activePlan.amount ? activePlan.amount / 100 : ''}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Paid By</label>
                        <div style={{textTransform: "capitalize"}}>
                            {latestSubscription.payment_method}
                        </div>
                    </Col>
                </Row>
                <Row className="m-0 p-0 mt-3">
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Since</label>
                        <div>
                            {latestSubscription.start_at ? dayjs.unix(latestSubscription.start_at).format(dateFormatStr) : ''}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Last Billed</label>
                        <div style={{textTransform: "capitalize"}}>
                            {latestSubscription.start_at ? dayjs.unix(latestSubscription.current_start).format(dateTimeFormatStr) : ''}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Next Billing</label>
                        <div>
                            {latestSubscription.start_at ? dayjs.unix(latestSubscription.charge_at).format(dateTimeFormatStr) : ''}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-3 mt-2">
                        <label className="billing-info-labels p-1">Remaining Billings</label>
                        <div style={{textTransform: "capitalize"}}>
                            {latestSubscription.remaining_count}
                        </div>
                    </Col>
                </Row>
            </Row>
            <Row className="shadow-lg m-5 p-4 user-profile-container-top-row">
                <h5>Payments</h5>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Subscription Id</th>
                        <th>Payment Id</th>
                        <th>Plan</th>
                        <th>Invoice Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.values(invoices).map((invoice, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {invoice.subscription_id}
                                    </td>
                                    <td>
                                        {invoice.payment_id}
                                    </td>
                                    <td>
                                        {invoice.line_items[0].name}
                                    </td>
                                    <td>
                                        {dayjs.unix(invoice.date).format(dateFormatStr)}
                                    </td>
                                    <td>
                                        {invoice.currency_symbol}{invoice.amount / 100}
                                    </td>
                                    <td style={{textTransform: "capitalize"}}>
                                        {invoice.status} {invoice.paid_at ? `(${dayjs.unix(invoice.paid_at).format(dateFormatStr)})` : null}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

const SubscriptionActiveButtons: React.FC<{ status: string, subsId: string }> = (props) => {
    const dispatch = useDispatch<AppDispatch>();

    if (props.status === 'active') {
        return (
            <>
                <Button size="sm" variant="danger" onClick={() => dispatch(showModal({
                    heading: 'Cancel Subscription',
                    body: 'Are you sure you want to Cancel this subscription?',
                    actonButtonText: 'Yes, Cancel subscription',
                    action: () => dispatch(cancelSubscription({subsId: props.subsId})),
                }))}>Cancel</Button>
            </>
        )
    } else if (props.status === 'halted' || props.status === 'pending') {
        return (
            <>
                <Button size="sm" variant="success">Retry Payment</Button>
            </>
        )
    } else if (props.status === 'paused') {
        return (
            <>
                <Button size="sm" variant="success" onClick={() => dispatch(showModal({
                    heading: 'Resume Subscription',
                    body: 'Are you sure you want to Resume this subscription?',
                    actonButtonText: 'Yes, Resume subscription',
                    action: () => dispatch(hideModal()),
                }))}>Resume Subscription</Button>
            </>
        )
    }
    return <></>
}

export default Billing;