import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosConfig'
import { Table, Space } from 'antd'
import { formatDate } from '../utils/formatDate'
import './OrderHistory.css'

const OrderHistory = ({ selection }) => {
    const [orderHistory, setOrderHistory] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))


    const fetchHistory = async () => {
        const history = await axios.get(`http://localhost:3001/order/${user._id}`)
        setOrderHistory(history.data)
    }

    useEffect(() => {
        fetchHistory()
    }, [selection])

    const columns = [
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            render: (text) => <a>{text}</a>
        },
        {
            title: "Price",
            dataIndex: "price",
            key: 'price'
        },
        {
            title: "Date",
            dataIndex: "date",
            key: 'date'
        }
    ]

    const data = []

    for(let i = 0; i < orderHistory.length; i++) {
        data.push({
            item: orderHistory[i].order.item,
            price: orderHistory[i].order.price,
            date: formatDate(orderHistory[i].created)
        })
    }

    return (
        <div>
            {orderHistory?.length === 0 ?
                <div className="orderHistory">
                    <h2>No orders to display</h2>
                    <div>You don't seem to have any orders</div>
                </div>
                :
                <div className='orderHistoryTable'>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }}/>
                </div>
            }
        </div>

    )
}

export default OrderHistory