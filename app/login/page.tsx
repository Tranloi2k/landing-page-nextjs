import getCookies from "./getCookies";
import LoginForm from "./loginForm";

const Login = async () => {
  console.log(await getCookies());
  return (
    <div className="mt-[100px] h-[400px]">
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
