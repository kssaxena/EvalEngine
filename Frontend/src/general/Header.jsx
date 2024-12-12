import React from "react";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

const Header = () => {
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user.user);

  console.log(user);

  const handleClickProfile = () => {
    Navigate("/profile");
  };
  return (
    <div className={`h-20 bg-[#191A1F] flex justify-around items-center`}>
      <section>
        {/* <h1>EvalEngine</h1> */}
        <Link className="logo text-cyan-500 font-bold text-lg" to={"/"}>
          EvalEngine
        </Link>
      </section>
      {user.length === 0 && (
        <section className={`flex justify-center items-center gap-5 px-5`}>
          <Button OnClick={() => Navigate("/login")} name={"Login"} />
          <Button OnClick={() => Navigate("/register")} name={"Register"} />
        </section>
      )}

      {user.length >0 && <Button OnClick={handleClickProfile} name={user[0]?.name} />}
    </div>
  );
};

export default Header;
