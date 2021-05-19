/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import {auth, provider } from "../firebase"
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Header() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName);
    // eslint-disable-next-line no-unused-vars
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/")

            }
        })
    }, [dispatch, history])

    const signIn = () => {
        auth.signInWithPopup(provider).then((result)=>{
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push("/")
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut());
            history.push("/login")
        })
    }
    return (
        
        <Nav>
             <Logo src="/images/logo.svg" />
             { !userName ? (
             <LoginContainer>
                 <Login onClick={signIn}>Login</Login> 
             </LoginContainer>
             ):
              <>
              
                    <NavMenu>
                        <a>
                            <img src='/images/home-icon.svg'></img>
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src='/images/search-icon.svg'></img>
                            <span>SEARCH</span>
                    
                        </a>

                        <a>
                            <img src='/images/watchlist-icon.svg'></img>
                            <span>WATCHLIST</span>
                        </a>

                        <a>
                            <img src='/images/original-icon.svg'></img>
                            <span>ORIGINAL</span>
                        </a>

                        <a>
                            <img src='/images/movie-icon.svg'></img>
                            <span>MOVIES</span>
                        </a>

                        <a>
                            <img src='/images/series-icon.svg'></img>
                            <span>SERIES</span>
                        </a>
                    </NavMenu>

                    <UserImg 
                        onClick={signOut}
                        src = "https://scontent.ffxe1-1.fna.fbcdn.net/v/t1.6435-9/173775835_826304534628430_5433967319215172927_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=whNFhfzk5WcAX-3HPK4&_nc_ht=scontent.ffxe1-1.fna&oh=791e71cab05886ec7daa7af6e9eee69d&oe=60B42110" /> 
                </>
                

            }
        </Nav>
     
    )
}


export default Header


const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center; 
    padding: 0 36px;
    overflow-x: hidden;
    
`

const Logo = styled.img`
   width: 80px;
   
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a{
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img{
        height: 20px;
    }

    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        position: relative;


        &:after {
            content: ""f;
            height: 2px;
            background: white;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
            
        }
    }


    &:hover {
        span:after {
            transform: scaleX(1);
            opacity: 1;
        }
    }
}
`

const  UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;

`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }

`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

`