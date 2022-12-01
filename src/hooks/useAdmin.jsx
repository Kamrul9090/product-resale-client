import { useEffect, useState } from "react";

const useAdmin = email => {
    // console.log(email);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    console.log('email', email);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data?.isAdmin);
                    setIsAdmin(data?.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin; 