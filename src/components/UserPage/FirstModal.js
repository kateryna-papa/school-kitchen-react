const FirstModal = () => {
    return(
        <div id="FirstModal" className="first__modal">
            <div className="modal__inner">
                <div className="modal-box">
                    <video id="modal__video">
                        <source src="/video/video.mp4" type="video/mp4"/>
                    </video>
                    <button type="submit" id="ModalBtn" className="modal___btn">
                        <div className="form__decor">
                            <img src="/images/arrow-right.svg" alt="arrow"/>
                        </div>
                        <span>Вперед</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default FirstModal;