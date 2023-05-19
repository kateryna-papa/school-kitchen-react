const ModalOrders = (props) => {
    return(
        <div /*className="modal-orders"*/ className={props.isOpened ? "modal-orders open" : "modal-orders hidden"}>
            <div className="modal__orders-inner">
                <button className="close__orders-btn" onClick={props.onModalClose}>&times;</button>
                <div className="modal__orders-content">
                    <ul className="modal__orders-list"></ul>
                </div>
            </div>
        </div>
    )
}
export default ModalOrders;