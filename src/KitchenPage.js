import Header from "./components/KitchenPage/Header";
import MenuBox from "./components/KitchenPage/MenuBox";
import OrdersBox from "./components/KitchenPage/OrdersBox";
import ModalMenu from "./components/KitchenPage/ModalMenu";
import {useState} from "react";
import {useEffect} from "react";


function KitchenPage() {

    const [modal, setModal] = useState({
        modal1:false
    })

    const [menuArr, setMenuArr] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMenuToFirebase = async (menu) => {
        try {
            const response = await fetch(
                "https://school-kitchen-71370-default-rtdb.firebaseio.com/menu.json",
                {
                    method: "POST",
                    body: JSON.stringify(menu),
                }
            );
            const data = await response.json();
            const menuArray = transformFbDataToArr(data);
            renderMenuItems(menuArray);
            fetchMenu();
        } catch (error) {
            console.error(error);
        }
    };

    const [menuData, setMenuData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                "https://school-kitchen-71370-default-rtdb.firebaseio.com/menu.json"
            );
            const data = await response.json();
            const transformedData = transformFbDataToArr(data);
            setIsLoading(false);
            setMenuData(transformedData);
            setMenuArr(transformedData);
            renderMenuItems(menuArr)
        } catch (error) {
            console.log(error);
        }
    };

    const transformFbDataToArr = (fbData) => {
        if (fbData) {
            return Object.keys(fbData).map((key) => {
                const item = fbData[key];
                item.id = key;
                return item;
            });
        } else {
            return [];
        }
    };

    function renderMenuItems() {
        return menuArr.map((item) => (
                <li key={item.id} className="panel__menu__item">
                    <div className="panel__menu__item-box">
                        <p className="panel__menu__item-name">{item.name}</p>
                        <p className="panel__menu__item-price">Ціна: {item.price} UAH</p>
                    </div>
                    <button className="btn-dlt" onClick={() => deleteMenuItem(item.id)}>Видалити</button>
                </li>
            )
        );
    }

    const deleteMenuItem = async (itemId) => {
        try {
            // Видалення об'єкту з бази даних
            await fetch(
                `https://school-kitchen-71370-default-rtdb.firebaseio.com/menu/${itemId}.json`,
                {
                    method: "DELETE",
                }
            );

            // Оновлення списку елементів
            const updatedMenuArr = menuArr.filter((item) => item.id !== itemId);
            setMenuArr(updatedMenuArr);
            renderMenuItems(updatedMenuArr);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="Panel">
            <Header/>
            <button className="app__btn app__btn-panel" onClick={() => setModal({
                ...modal, modal1: true
            })}>
                <div className="app__decor">
                    <img src="/images/arrow-right.svg" alt=""/>
                </div>
                <span>Додати товар в меню</span>
            </button>
            <section className="panel">
                <div className="container">
                    <div className="panel__inner">
                       <MenuBox renderMenuItems={renderMenuItems}/>
                        <OrdersBox/>
                    </div>
                </div>
            </section>
            <ModalMenu isOpened={modal.modal1}
                       onModalClose={() => setModal({
                           ...modal, modal1: false
                       })}
            sendMenuToFirebase={sendMenuToFirebase}/>
        </div>
    );
}

export default KitchenPage;
