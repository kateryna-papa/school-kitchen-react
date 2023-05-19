const ModalDone = () => {
    return(
        <div id="Modal-done" className="modal">
            <div className="modal__inner">
                <div className="modal-content">
                    <p className="modal__message">Ваше замовлення успішно відправлено:)</p>
                    <img
                        className="modal__complete-img"
                        src="/images/complete.png"
                        alt="complete"
                    />
                </div>
            </div>
        </div>
    )
}
export default ModalDone;