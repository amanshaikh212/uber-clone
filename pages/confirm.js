import { useEffect,useState }from "react";
import tw from "tailwind-styled-components"
import Map from './components/Map'
import { useRouter } from "next/dist/client/router";
import RideSelector from "./components/RideSelector";
import Link from "next/dist/client/link";
const Confirm = () => { 

    const router = useRouter();
    const { pickup,dropoff }=router.query;
    

    const [pickupCoordinates, setPickupCoordinates] = useState([0,0]);
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0,0]);
    

    const getPickupCoordinates = (pickup)=>{
        const pickupLocation = pickup;
        // Fetch 
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupLocation}.json?`+
        new URLSearchParams({
            access_token: "pk.eyJ1IjoiYW1hbi0yMTIiLCJhIjoiY2t3aHUxb24yMTFweDJ2cXdtcHdmeHVhNCJ9.7U3ZZXiVMxTWnIuFQ6UqRw",
            limit:1
        })
        )
        .then(response => response.json())
        .then(data =>{
            
            setPickupCoordinates(data.features[0].center)
        })

    }

    const getDropoffCoordinates = (dropoff) =>{
        const dropoffLocation = dropoff;
        // Fetch 
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffLocation}.json?`+
        new URLSearchParams({
            access_token: "pk.eyJ1IjoiYW1hbi0yMTIiLCJhIjoiY2t3aHUxb24yMTFweDJ2cXdtcHdmeHVhNCJ9.7U3ZZXiVMxTWnIuFQ6UqRw",
            limit:1
        })
        )
        .then(response => response.json())
        .then(data =>{
            setDropoffCoordinates(data.features[0].center);
        })
    }

    useEffect(()=>{
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    },[])


    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/search">
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
                </Link>
            </ButtonContainer>
            <Map pickupCoordinates={pickupCoordinates} dropoffCoordinates = {dropoffCoordinates}/>
            <RideContainer>
                <RideSelector pickupCoordinates={pickupCoordinates} dropoffCoordinates = {dropoffCoordinates}/>
                    
                
                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConfirmButtonContainer>
                
            </RideContainer>
        </Wrapper>
    )
}

export default Confirm


const Wrapper = tw.div`
    flex h-screen flex-col
`

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`

const ConfirmButtonContainer = tw.div`
    border-t-2
`
const ConfirmButton = tw.div`
        bg-black text-white my-4 mx-4 py-4 text-center text-xl cursor-pointer
`
const ButtonContainer = tw.div`
    rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer 

`
const BackButton = tw.img`
    h-full object-contain 
`