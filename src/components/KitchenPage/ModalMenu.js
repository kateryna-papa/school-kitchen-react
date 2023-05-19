import {useState} from "react";

const ModalMenu = (props) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
            e.preventDefault();

            if (!name && !price) {
                setError("Введіть назву і ціну");
                return;
            } else if (!price) {
                setError("Введіть ціну");
                return;
            } else if (!name) {
                setError("Введіть назву");
                return;
            }

            const number = parseInt(price, 10);
            if (isNaN(number) || number < 0) {
                // Введено некоректне значення
                setError('Введіть коректну ціну');
                return;
            }

            if (image === '') {
                // Вибрано перший option
                setError('Виберіть картинку');
                return;
            }

            const menu = {
                name: name,
                price: price,
                image: image,
            };

            setError("");
            props.sendMenuToFirebase(menu);
        }
    ;

    return (
        <div id="Modal-menu" className={props.isOpened ? "modal show blur-show" : "modal blur-hide"}>
            <div className="modal__inner">
                <div className="modal-content">
                    <form className="form" name="menu">
                        <div className="form__inner">
                            <button className="close-btn" onClick={props.onModalClose}>&times;</button>
                        </div>
                        <div>Назва страви</div>
                        <input
                            className="input input__name input__surname"
                            placeholder="Назва страви"
                            type="text"
                            name="name-food"
                            required
                            maxLength="20"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div>Ціна</div>
                        <input
                            className="input input__price input__name"
                            placeholder="Ціна"
                            type="number"
                            name="price"
                            required
                            maxLength="20"
                            min="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div>Картинка</div>
                        <select
                            className="form__select image__select select class__select"
                            name="image"
                            required
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >
                            <option value="">Виберіть картинку</option>
                            <option value="images/dogg.png">Hot dog</option>
                            <option value="images/pizza.png">Pizza</option>
                            <option value="images/burger.png">Burger</option>
                            <option value="images/egg.png">Fried egg</option>
                            <option value="images/fries.png">French fries</option>
                            <option value="images/sandwich.png">Sandwich</option>
                            <option value="images/pasta.png">Pasta</option>
                            <option value="images/bread.png">Bread</option>
                            <option value="images/sauces.png">Sauces</option>
                            <option value="images/donut.png">Donut</option>
                            <option value="images/chocolate.png">Chocolate</option>
                            <option value="images/ice.png">Ice cream</option>
                            <option value="images/cola.png">Coca Cola</option>
                            <option value="images/tea.png">Tea</option>
                        </select>
                        <div className="error-block">{error && <p className='error-message'>{error}</p>}</div>
                        <button type="submit" id="FormBtn" className="form__btn" onClick={handleSubmit}>
                            <div className="form__decor">
                                <img src="/images/arrow-right.svg" alt="arrow"/>
                            </div>
                            <span>Відправити</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ModalMenu;
