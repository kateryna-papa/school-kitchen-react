const OrdersBox = () => {
    return (
        <div className="panel__orders-box panel-box">
            <div className="loader-box">
                <div className="loader"></div>
            </div>
            <div className="panel__orders-settings">
                <button className="panel__orders-render">
                    Оновити данні
                    <img className="load__img" src="/images/load.png" alt=""/>
                </button>
                <div className="panel__order-select-box">
                    <p className="panel__order-text">Сортувати за:</p>
                    <select className="panel__select select">
                        <option value="break">
                            Номером перерви (За зростанням)
                        </option>
                        <option value="date">Датою (Спочатку новіші)</option>
                    </select>
                </div>
            </div>
            <h2 className="panel__menu-title">Замовлення</h2>
            <ul className="panel__order-list"></ul>
        </div>
    )
}
export default OrdersBox;