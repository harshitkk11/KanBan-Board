import kanban from "../assets/images/KanBan-Board.png"


const Forgot = () => {
    return (
        <div className="form">
            <div className="form-img-div">
                <img src={kanban} alt="KanBan Board"/>
            </div>

            <div className="forgot-form-div">
                <h1 className="forgot-heading">Forgot Password?</h1>
                <p>Enter your email address you used at the time of account creation, we will send you instruction to reset your password.</p>

                <form className="forgotpass-form" action="">

                    <input id="email" className="email" type="email" placeholder="Enter Your Email Address" />
                    <br/>
                    <br/>
                    <input type="submit" value="Reset Password" className="reset" />
                    <br/>
                    <div className="signup-link">
                        <p>Back to <a href="/" className="login">log in</a></p>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Forgot