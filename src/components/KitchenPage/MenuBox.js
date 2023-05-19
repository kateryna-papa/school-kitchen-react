//import {renderMenuItems} from "./ModalMenu";

const MenuBox = (props) => {
    return (
        <div className="panel__menu-box panel-box">
            <h2 className="panel__menu-title">Меню</h2>
            <div className="loader-box-menu">
                <div className="loader"></div>
            </div>
            <ul className="panel__menu-list">
                {props.renderMenuItems()}
            </ul>
        </div>
    )
}
export default MenuBox;