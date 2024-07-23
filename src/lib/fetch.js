
const ROUTE_URI = "https://srws.ru";

export const getPerson = async (props) => {
    try {
        const request = await fetch(ROUTE_URI + '/getperson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key: "123",
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

export const registration = async (props) => {
    try {
        const request = await fetch(ROUTE_URI + '/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                key: "123",
                tid: props.tid,
                username: props.username
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
                key: "123",
                tid: props.tid,
                txhash: props.txhash,
                package_index: props.package_index,
                amount: props.amount
            })
        })
        return await request.json()
    } catch (error) {
        console.log("Error during createtx: ", error)
        return null
    }
}