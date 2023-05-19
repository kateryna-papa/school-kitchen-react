import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    surname: Yup.string()
        .required('Прізвище обов’язкове для заповнення')
        .max(20, 'Максимальна довжина 20 символів'),
    name: Yup.string()
        .required('Ім’я обов’язкове для заповнення')
        .max(20, 'Максимальна довжина 20 символів'),
    classNum: Yup.string().required('Необхідно вибрати клас'),
    breakNum: Yup.string().required('Необхідно вибрати номер перерви'),
});

const initialValues = {
    surname: '',
    name: '',
    classNum: '',
    breakNum: '',
};

export default function FeedbackForm({onModalClose}) {
    const handleSubmit = (values) => {
        // Відправка даних форми
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form className="form animate__animated" name="feedback">
                    <div className="form__inner">
                        <div>Прізвище</div>
                        <button className="close-btn" onClick={onModalClose}>
                            &times;
                        </button>
                    </div>
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
                        <ErrorMessage
                            className="error-message"
                            name="classNum"
                            component="div"
                        />
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
                    <div>Номер перерви</div>
                    <select
                        className="form__select select break__select"
                        name="breakNum"
                        required>
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
                    </select>
                    <div className="error-message"></div>
                    <div className="form__list-orders-title">Список замовлення</div>
                    <div className="form__list">
                        <div className="form__list">
                            <div className="form__list-text">Ви не додали жодного товару</div>
                            <ol className="form__list-items"></ol>
                        </div>
                        <div className="total__price">
                            Сума: <span className="total__price_form">0</span> <span>UAH</span>
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
    )
}

