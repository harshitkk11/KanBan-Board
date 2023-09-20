const Forgot = () => {
    return (
        <div className="forgot">
            <form className="forgotpass-form" action="">
                <h1 className="forgot-heading">Reset Your Password</h1>
                <br/>
                <br/>
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
    )
}

export default Forgot