import {useNavigate} from "react-router-dom";

const Header =  () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <header className="header">
        <div className="container">
            <div className="header__inner">
                <div className="header__right">
                    <p className="header__name">School kitchen</p>
                    <img className="header__img" src="/images/icon2.svg"/>
                </div>
                <div className="header__link-box">
                    <a className="header__link" onClick={handleButtonClick}>
                        Сторінка користувача *test
                    </a>
                </div>
            </div>
        </div>
    </header>)
}
export default Header;