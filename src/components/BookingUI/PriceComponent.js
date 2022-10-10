import React, { useEffect} from 'react'

const PriceComponent = ({limitedOffers, domestic, international, dateOfLeave, dateOfReturn, flightType, withHotel, eachRegion, initialAmount, initialAmountSet, discount, discountSet, amount, amountSet}) => {
    useEffect(()=> {
        discountSet(limitedOffers)
    }, [flightType, limitedOffers])
    
    useEffect(()=> {
        if (dateOfLeave && dateOfReturn && eachRegion){
            initialAmountSet({domestic, international})
            return
        }
    }, [dateOfLeave, dateOfReturn, withHotel, eachRegion, domestic, international])

    useEffect(()=> {
        if (initialAmount){
        amountSet()
        }
    }, [initialAmount])
    
    return (
        <div className="flex flex-col col-span-6 lg:col-span-10 lg:order-last">
            {[["Initial Amount", initialAmount], ["Promo Discount", discount], ["Final Amount", amount]].map(([title, localAmount], index) => (
                <div className="flex justify-between first:text-black/[0.6] text-red-600 last:text-[#2B8E9B] last:text-2xl" key={index}>
                    <h1 className='text-black text-base'>{title}</h1>
                    <p className=''>{initialAmount&&amount && localAmount}</p>
                </div>
            ))}
        </div>
    )
}

export default PriceComponent