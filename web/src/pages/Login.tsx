import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
  const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [user, setUser] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/product");
    } catch (err: any) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
    }
  };

  const handleUserInput = (e: React.FormEvent) =>
    setUser((e.target as HTMLInputElement).value);

  const handlePwdInput = (e: React.FormEvent) =>
    setPwd((e.target as HTMLInputElement).value);
  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          {errMsg && (
            <p
              ref={errRef}
              className={errMsg ? "text-danger" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                ref={userRef}
                onChange={handleUserInput}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handlePwdInput}
                placeholder="Enter password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return content;
};

export default Login;
