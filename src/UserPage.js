import Header from './components/UserPage/Header';
import Notification from "./components/UserPage/Notification";
import Tray from "./components/UserPage/Tray";
import FirstModal from "./components/UserPage/FirstModal";
import Modal from "./components/UserPage/Modal";
import ModalDone from "./components/UserPage/ModalDone";
import ModalSendOrder from "./components/UserPage/ModalSendOrder";
import ModalOrders from "./components/UserPage/ModalOrders";
import {useState} from "react";


function UserPage() {

    const [modal, setModal] = useState({
        modal1:false,
        modal2:false
    })

    const [trayArr, setTrayArr] = useState([]);

    const calcPrice = (arr) => {
        let totalPrice = 0;
        arr.forEach((item) => {
            totalPrice += +item.price * item.count;
        });
        return totalPrice;
    };

    const renderFoodsList = (arr) => {
        if (arr.length === 0) {
            return (
                <div className="form__list-text" style={{ display: 'block' }}></div>
            );
        } else {
            return (
                <ul className="form__list">
                    {arr.map((item) => (
                        <li key={item.id} data-id={item.id}>
                            <div className="price">
                                <span>{`${item.name} x ${item.count}`}</span>
                                <div>
                                    <span>{item.price * item.count}</span>
                                    <span>UAH</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            );
        }
    };

    return (
        <div className="App">
            <div className="wrapper">
                <Notification/>
                <Header/>
                <div className="app">
                    <div className="container">
                        <Tray
                              trayArr={trayArr}
                              setTrayArr={setTrayArr}
                              calcPrice={calcPrice}
                              renderFoodsList={renderFoodsList}/>
                        <div className="app__btn-box animate__animated animate__fadeInUp">
                            <button className="app__btn" onClick={() => setModal({
                                ...modal, modal1: true
                            })}>
                                <div className="app__decor">
                                    <img src="/images/arrow-right.svg" alt=""/>
                                </div>
                                <span>Зробити замовлення</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FirstModal/>
            <Modal isOpened={modal.modal1}
                   onModalClose={() => setModal({
                       ...modal, modal1: false
                   })}
                   trayArr={trayArr}
                   calcPrice={calcPrice}
                   renderFoodsList={renderFoodsList}/>
            <ModalDone/>
            <ModalSendOrder/>
            <ModalOrders isOpened={modal.modal2}
                         onModalClose={() => setModal({
                             ...modal, modal2: false
                         })}/>
            <button className="app__orders-list-btn animate__animated" onClick={() => setModal({
                ...modal, modal2: true
            })}>
                <img className="app__orders-list-img" src="/images/ordersList.svg" alt="img"/>
            </button>
        </div>
    );
}

export default UserPage;
