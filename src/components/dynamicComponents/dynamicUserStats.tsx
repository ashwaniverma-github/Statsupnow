import dynamic from "next/dynamic";

const UserStats = dynamic(()=>import('../userStats'),{ssr:false})

export default UserStats