import {useState, useEffect} from "react";


function Menu(props) {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchMenu() {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://school-kitchen-71370-default-rtdb.firebaseio.com/menu.json"
                );
                const data = await response.json();
                const transformedData = transformFbDataToArr(data);
                setMenuItems(transformedData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        fetchMenu();
    }, []);


    function transformFbDataToArr(fbData) {
        if (fbData) {
            return Object.keys(fbData).map((key) => {
                const item = fbData[key];
                item.id = key;
                return item;
            });
        } else {
            return [];
        }
    }


    const [selectedItemId, setSelectedItemId] = useState(null);

    function renderFoodsItems() {

        const openButton = (itemId) => {
            setSelectedItemId(itemId);
        };

        const handleAddToTray = (itemId) => {
            const selectedItem = document.querySelector(`li[data-id="${itemId}"]`);
            addFoodToTray(selectedItem)
            console.log(props.trayArr)
            //addFoodToTray(itemId);
            calcPrice(props.trayArr);
            props.renderFoodsInTray(props.trayArr);
            props.renderFoodsList(props.trayArr);
            createNotification(selectedItem);

        };

    /*    const renderFoodsInTray = (arr) => {
            return arr.map((item) => {
                return (
                    <div key={item.id}>
                        <div className="app__tray-item-box">
                            <img src={item.imgUrl} alt="food" className="app__food-img" />
                            <span className="app__tray-count">{`x ${item.count}`}</span>
                        </div>
                    </div>
                );
            });
        };*/

        const createNotification = (dragEl) => {

            let name = dragEl.querySelector('.app__food-name').textContent;
            let notification = `
          <li class="notification__item notification-add">
          <span class="notification__text"> Страву </span>
          <span class="notification__name">${name}</span>
          <span class="notification__text"> було додано до замовлення </span>
        </li>`;
        };




        const calcPrice = (arr) => {
            let totalPrice = 0;
            arr.forEach((item) => {
                totalPrice += +item.price * item.count;
            });
            return totalPrice;
        };

        const addFoodToTray = (selectedItem) => {
            if (!selectedItem) {
                return;
            }

            const id = selectedItem.getAttribute("data-id");
            const nameElement = selectedItem.querySelector(".app__food-name");
            const priceElement = selectedItem.querySelector(".app__food-price-num");
            const imgElement = selectedItem.querySelector(".app__food-img");

            if (!id || !nameElement || !priceElement || !imgElement) {
                return;
            }

            const name = nameElement.textContent;
            const price = priceElement.textContent;
            const imgUrl = imgElement.getAttribute("src");

            const newFood = {
                id: id,
                name: name,
                price: price,
                imgUrl: imgUrl,
                count: 1,
            };


            if (props.trayArr.length === 0) {
                props.setTrayArr([newFood]);
                return;
            }

            let flag = false;

            const updatedTrayArr = props.trayArr.map((obj) => {
                if (obj.id === newFood.id) {
                    obj.count += 1;
                    flag = true;
                }
                return obj;
            });

            if (!flag) {
                props.setTrayArr([...updatedTrayArr, newFood]);
            } else {
                props.setTrayArr(updatedTrayArr);
            }
        };

        return menuItems.map((item) => (
            <li key={item.id} data-id={item.id}
                draggable="true"
                className="app__food-item"
                onClick={() => openButton(item.id)}
            >
                <img src={item.image} alt="food" className="app__food-img"/>
                <h3 className="app__food-name">{item.name}</h3>
                <p className="app__food-price">
                    <span className="app__food-price-num">{item.price}</span> <span>UAH</span>
                </p>
                <div className={`app__food-mobile__add-box ${selectedItemId === item.id ? 'show' : ''}`}>
                    <div className="app__food-mobile__add">
                        <button className="app__food-mobile__add-btn"
                                onClick={() => handleAddToTray(item.id)}>Додати
                        </button>
                    </div>
                </div>
            </li>
        ));
    }

    return (
        <div>
            {loading && <div className="loaderMenu show"></div>}
            <ul id="foodsList" className="app__food-inner">
                {renderFoodsItems()}
            </ul>
        </div>
    );
}

export default Menu;
