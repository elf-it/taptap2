
const ROUTE_URI = "https://api.mamotik.com";
const key = "pmVXd8gMUZAKqix"

export const getPerson = async (props) => {
    try {
        const request = await fetch(ROUTE_URI + '/getperson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid,
                username: props.username
            })
        })

        return await request.json()
    } catch (error) {
        console.log("Error during getperson: ", error)
        return null
    }
}

export const getReferals = async (props) => {
    try {
        const request = await fetch(ROUTE_URI + '/getreferals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid
            })
        })

        return await request.json()
    } catch (error) {
        console.log("Error during getreferals: ", error)
        return null
    }
}

export const getAutoclick = async (props) => {
    try {
        const request = await fetch(ROUTE_URI + '/getautoclick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid
            })
        })

        return await request.json()
    } catch (error) {
        console.log("Error during getAutoclick: ", error)
        return null
    }
}

export const registration = async (props) => {
    try {
        const request = await fetch(ROUTE_URI + '/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid,
                username: props.username,
                referrer: props?.referrer,
                lang: props.lang
            })
        })

        return await request.json()
    } catch (error) {
        console.log("Error during registration: ", error)
        return null
    }
}

export const createTX = async (props) => {
    try{
        const request = await fetch(ROUTE_URI + '/createtx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid,
                txhash: props.txhash,
                package_index: props.package_index,
                amount: props.amount,
                package: props.package
            })
        })
        return await request.json()
    } catch (error) {
        console.log("Error during createtx: ", error)
        return null
    }
}

export const setMyCoins = async (props) => {
    try{
        const request = await fetch(ROUTE_URI + '/setmycoins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid,
                amount: props.amount,
                max_amount: props.max_amount,
                coins: props.coins
            })
        })
        return await request.json()
    } catch (error) {
        console.log("Error during setmycoins: ", error)
        return null
    }
}

export const getSteps = async () => {
    try{
        const request = await fetch(ROUTE_URI + '/getsteps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key
            })
        })
        return await request.json()
    } catch (error) {
        console.log("Error during getSteps: ", error)
        return null
    }
}

export const setLangR = async (props) => {
    try{
        const request = await fetch(ROUTE_URI + '/setlang', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key,
                tid: props.tid,
                lang: props.langr
            })
        })
        return await request.json()
    } catch (error) {
        console.log("Error during getSteps: ", error)
        return null
    }
}

export const getLang = async () => {
    try{
        const request = await fetch(ROUTE_URI + '/getlang', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            }
        })
        return await request.json()
    } catch (error) {
        console.log("Error during getSteps: ", error)
        return null
    }
}