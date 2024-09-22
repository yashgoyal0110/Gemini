import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import './Clerk.css'; 
import { assets } from "../assets/assets";

function Clerk() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>
            <div className="tooltip">
              <a href="#" style={{ cursor: 'pointer' }}>
                <img src={assets.user_icon} alt="Sign In" style={{ width: '48px', height: '48px' }} />
              </a>
              <span className="tooltiptext">Your Account</span>
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default Clerk;
