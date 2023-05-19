

const OrderButton = () => {

    return(
        <div className="app__btn-box animate__animated animate__fadeInUp">
            <button className="app__btn">
                <div className="app__decor">
                    <img src="/images/arrow-right.svg" alt=""/>
                </div>
                <span>Зробити замовлення</span>
            </button>
        </div>
    )
}
export default OrderButton;