import Collapse from "../Collapse";

const FAQ = () => {
    return ( 
    
        <div className="p-4">    
            <div className="text-center mx-auto mb-8">   
                <h2 className="text-3xl mb-2">help & faqs</h2>    
                <p>Need help? We've put together a handy FAQ section for you. If you can't find an answer to your question below, feel free to contact our fantastic customer service team</p>
            </div>  

            <Collapse question="I'm unsure of the colour or fabric that I'd like my lampshade made with?" answer="No problem. Shades By Woodpecker offers a free sample service whereby you can request any of the materials you're interested in to check for colour matching and quality purposes. Simply fill out our request form and we'll have these dispatched to you."/>
            <Collapse question="How do I know the size lampshade to order for my lamp?" answer="Prior to ordering your Lampshade it is important to know what size lampshade you will need. Choosing the right lampshade can be tricky but, there are a few basic (though not exclusive) considerations to determine the approximate size of your lampshade. For standard Circular Drum, French Drum and Empire Tapered shades that will sit on a table lamp, making sure that it looks proportional to your Lamp base is key. This means first taking a measurement of your lamp’s width at it’s widest point along with the height, from base to bulb fitting. Your shades should then be approximately twice the width of your lamp base measurement in diameter. This approximation though, can alter based on the shape of your lamp" />
            <Collapse question="What fitting types do your lampshades use?" answer="All of our shades come with a 40mm fitting. This is suitable for standard EU fittings. We also supply (fitted) a reducer ring that brings this size down from 40mm to 29mm. This 29mm is suitable for standard UK fittings. Our fittings are recessed 40mm from the top or bottom of the shade (dependant on your orientation). If either of these fittings is unsuitable; i.e. you have a Harp/Finial fitting at the top of your lamp, or you would like the shade to sit lower than our standard fittings allow, please get in touch as we are usually able to customise your order to suit your needs." />    
            <Collapse question="I see many straight sided drum lampshades but I would like an Empire or French Drum style lampshade." answer="Whilst Shades By Woodpecker does specialise in the more modern straight sided drum lampshades, we do offer a range of different sized tapered shades in Empire or French Drum style. If we do not have the correct size specifications for the lampshade you require listed as standard, please get in touch via our 'Contact Us' page or email us at rubab@shadesbywoodpecker.co.uk and we can discuss your bespoke lampshade requirements." />    
            <Collapse question="When can I expect to receive my lampshade?" answer="Shades By Woodpecker work very hard to dispatch all lampshade orders as quickly as possible but, depending on current demand, our lead time does vary. For extended lead times we will display a banner at the top of our Home page notifying visitors of their expected wait time. All UK orders are then sent via tracked and signed for services through either Royal Mail or Parcel Force, depending on order size and your location. We're always happy to deliver to business addresses to makes things that little bit easier for you. All overseas orders are shipped from us using Parcel Force. Typically, we use a 48hr delivery service so please consider this on top of our current lead times. Alternatively, we do offer a collection service that can be selected for UK mainland customers in close proximity to our workshop in Blackminster, Evesham. Should you wish to collect your lampshade in person, this option can be selected when checking out your order. You will receive an email notifying you of your order being ready for collection." />    
            <Collapse question="What Bulb should I use?" answer="Shades By Woodpecker recommend Low Energy Bulbs however, if using a regular bulb we recommend 60w Bulbs." />    

        </div>

    );
}
 
export default FAQ;