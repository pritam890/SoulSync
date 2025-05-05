import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()


const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [balance, setBalance] = useState(false)
    const [completedActivities, setCompletedActivities] = useState([])
    const [rewardsRedeem, setRewardsRedeem] = useState([])
    const [completedTask, setCompletedTask] = useState(new Set())
    const [completedRewards, setCompletedRewards] = useState(new Set())

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const loadBalanceData = async ()=>{
        try{

            const {data} = await axios(backendUrl + '/api/user/balance', {headers: {token}})

            if(data.success){
                console.log(data)
                setBalance(data.balance)
                setUser(data.user)
            }else{
                console.log("issue here")
            }


        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const loadActivity = async()=>{
        try{

            const {data} = await axios(backendUrl + '/api/user/fetch-activity', {headers: {token}})

            if(data.success){
                console.log(data)
                setCompletedActivities(data.activities)
                const titles = data.activities.map(act => act.title);
                setCompletedTask(new Set(titles))
            }else{
                console.log("issue here")
            }


        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    const loadRedeems = async()=>{
        try{

            const {data} = await axios(backendUrl + '/api/user/fetch-redeem', {headers: {token}})

            if(data.success){
                console.log(data)
                setRewardsRedeem(data.rewardsRedeem)
                const titles = data.rewardsRedeem.map(act => act.title);
                setCompletedRewards(new Set(titles))
            }else{
                console.log("issue loadredeems")
            }


        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
        navigate('/')
    }

    useEffect(()=>{
        if(token){
            loadBalanceData()
            loadActivity()
            loadRedeems()
        }
    },[token])

    const value = {
        user, setUser, showLogin, setShowLogin, balance, setBalance, backendUrl, token, setToken, logout, loadBalanceData, completedActivities, rewardsRedeem,
        loadActivity, loadRedeems, completedTask,completedRewards
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider