const ModalSendOrder = () => {
    return(
        <div id="Modal-send_order" className="modal">
            <div className="modal__inner">
                <div className="modal-content">
                    <p className="modal-send_text">
                        Вибрана вами перерва вже закінчилась, ваше замовлення буде
                        перенесено на
                        <span className="modal-send-date"></span>
                    </p>
                    <div className="modal-content-btns">
                        <button className="madal-orders-btn modal-send">
                            Зробити замовлення
                        </button>
                        <button className="madal-orders-btn modal-no-send">
                            Скасувати замовлення
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalSendOrder;