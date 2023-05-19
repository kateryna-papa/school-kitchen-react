import React, {useRef, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const validationSchema = Yup.object({
    surname: Yup.string()
        .max(20, 'Прізвище не повинно бути більше 20 символів')
        .required('Прізвище обов\'язкове'),
    name: Yup.string()
        .max(20, 'Ім\'я не повинно бути більше 20 символів')
        .required('Ім\'я обов\'язкове'),
    classNum: Yup.string()
        .required('Клас обов\'язковий'),
    breakNum: Yup.string()
        .required('Номер перерви обов\'язковий')
});

const initialValues = {
    surname: '',
    name: '',
    classNum: '',
    breakNum: ''
};

const Modal = (props) => {

    const sendOrdersToFireBase = async (obj) => {
        class ApiService {
            constructor(baseUrl) {
                this.url = baseUrl;
            }

            async createOrder(obj) {
                try {
                    const request = new Request(this.url + '/orders.json', {
                        method: 'POST',
                        body: JSON.stringify(obj),
                    });
                    const response = await fetch(request);
                    return await response.json();
                } catch (error) {
                    console.error(error);
                }
            }
        }
        const apiService = new ApiService('https://school-kitchen-71370-default-rtdb.firebaseio.com/');
        apiService.createOrder(obj);
    };

    const onSubmit = (values, { setSubmitting }, e) => {
        console.log(values);
        setSubmitting(false);
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const surname = formData.get('surname');
        const name = formData.get('name');
        const classNum = formData.get('classNum');
        const breakNum = formData.get('breakNum');

        const order = {
            surname: surname,
            name: name,
            classNum: classNum,
            breakNum: breakNum,
            list: props.trayArr,
            date: new Date().toLocaleString(),
            //deadline: deadline,
        };

        // Use the form data values
        console.log(order);
        sendOrdersToFireBase(order);
    };

    const formRef = useRef(null);

    function foodsList () {
        if (props.trayArr.length > 0) {
            return <ol className="form__list-items">{props.renderFoodsList(props.trayArr)}</ol>
        } else {
            return <div className="form__list-text">Ви не додали жодного товару</div>
        }
    }

    return (
        <div id="Modal" className={props.isOpened ? "modal show blur-show" : "modal blur-hide"}>
            <div className="modal__inner">
                <div className="modal-content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form className="form animate__animated" name="feedback" ref={formRef}>
                                <div className="form__inner">
                                    <button className="close-btn" onClick={props.onModalClose}>
                                        &times;
                                    </button>
                                </div>
                                <div>Прізвище</div>
                                <Field
                                    className="input input__surname"
                                    placeholder="Ваше Прізвище"
                                    type="text"
                                    name="surname"
                                />
                                <ErrorMessage
                                    className="error-message"
                                    name="surname"
                                    component="div"
                                />
                                <div>Ім’я</div>
                                <Field
                                    className="input input__name"
                                    placeholder="Ваше ім’я"
                                    type="text"
                                    name="name"
                                />
                                <ErrorMessage
                                    className="error-message"
                                    name="name"
                                    component="div"
                                />
                                <div>Клас</div>
                                <Field
                                    className="form__select select class__select"
                                    name="classNum"
                                    as="select"
                                >
                                    <option value="">Виберіть варіант</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                </Field>
                                <ErrorMessage
                                    className="error-message"
                                    name="classNum"
                                    component="div"
                                />
                                <div>Номер перерви</div>
                                <Field
                                    className="form__select select break__select"
                                    name="breakNum"
                                    as="select"
                                    >
                                    <option value="">Виберіть варіант</option>
                                    <option
                                        data-minuts="45"
                                        data-hours="9"
                                        value="1">
                                        1 Урок 9:<span className="minuts-order">45</span>
                                    </option>
                                    <option
                                        data-minuts="40"
                                        data-hours="10"
                                        value="2">
                                        2 Урок 10:<span className="minuts-order">40</span>
                                    </option>
                                    <option
                                        data-minuts="45"
                                        data-hours="11"
                                        value="3">
                                        3 Урок 11:<span className="minuts-order">45</span>
                                    </option>
                                    <option
                                        data-minuts="50"
                                        data-hours="12"
                                        value="4">
                                        4 Урок 12:<span className="minuts-order">50</span>
                                    </option>
                                    <option
                                        data-minuts="45"
                                        data-hours="13"
                                        value="5">
                                        5 Урок 13:<span className="minuts-order">45</span>
                                    </option>
                                    <option
                                        data-minuts="40"
                                        data-hours="14"
                                        value="6">
                                        6 Урок 14:<span className="minuts-order">40</span>
                                    </option>
                                </Field>
                                <ErrorMessage
                                    className="error-message"
                                    name="breakNum"
                                    component="div"
                                />
                                <div className="error-message"></div>
                                <div className="form__list-orders-title">Список замовлення</div>
                                <div className="form__list">
                                    <div className="form__list">
                                        {foodsList()}
                                    </div>
                                    <div className="total__price">
                                        Сума: <span className="total__price_form">{props.calcPrice(props.trayArr)}</span> <span>UAH</span>
                                    </div>
                                </div>
                                <button type="submit" id="FormBtn" className="form__btn">
                                    <div className="form__decor">
                                        <img src="/images/arrow-right.svg" alt="arrow"/>
                                    </div>
                                    <span>Відправити</span>
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default Modal;