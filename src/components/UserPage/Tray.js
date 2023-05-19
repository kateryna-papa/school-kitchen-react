import React from 'react';
import Menu from "./Menu";


const Tray = (props) => {

    const renderFoodsInTray = (arr) => {
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
    };

    return (
        <div className="container">
            <div className="app__tray__container">
                <div
                    className="app__tray-box_animation animate__animated animate__fadeInDown"
                >
                    <div className="app__tray-box">
                        <div className="app__tray">
                            {renderFoodsInTray(props.trayArr)}
                        </div>
                    </div>
                </div>

                <div className="app__tray-btn">
                    <button className="app__tray-prev" >
                        Видалити останній
                        <img src="/images/prev.jpg" alt="" className="app__tray-prev__img"/>
                    </button>
                </div>
                <div className="app__price__container">
                    <div className="app__price__container-box">
                        <div className="app__price__text">Вартість:</div>
                        <div className="app__price__number">
                            <span className="app__price__number-num">{props.calcPrice(props.trayArr)}</span> <span>UAH</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app__food-wrapper">
                <div className="loader-menu">
                    <div className="loader loader-menu_users"></div>
                </div>
                <Menu trayArr={props.trayArr}
                      setTrayArr={props.setTrayArr}
                      renderFoodsInTray={renderFoodsInTray}
                      renderFoodsList={props.renderFoodsList}
                />
            </div>
        </div>
    )
}
export default Tray;

