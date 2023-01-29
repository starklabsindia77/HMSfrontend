// form

import { Stack, TextField, MenuItem, Box, Typography } from '@mui/material';
// components




// ----------------------------------------------------------------------

export default function InvoiceTerms() {
    

    return (
        <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row',  }}
            sx={{ p: 3, mt:"150px"}}
        >

            
            <Box>
                <Typography variant="h4" gutterBottom>
                    Terms and Conditions
                </Typography>
                <p className="pt-8">
                    <p className="pb-1"><b>TICKET POLICIES</b></p><br />
                    Most Ticket(s) are non-refundable and non-transferable. Name changes are not allowed. All service fees are non-refundable. Prices may not include
                    baggage fees and other services offered by the airlines. Fares are not guaranteed until ticketed. Changes to the itinerary are subject to airline policies and
                    may involve airline penalty(s), difference in fare, taxes and administrative service fee for the agency. Passenger(s) name on the ticket must match the
                    name as appears on the government photo I.D. for domestic travel and passport for international travel.
                    Note: If there is an infant accompanied in the trip who will be more than 2 years of age at the time of the return flight then passenger(s) may have to pay
                    for additional charges for upgrading the ticket to a child passenger. If due to any reasons they are not allowed to board the flight then The Travel Horse
                    will not be responsible for it.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b> 24 HOUR REFUND POLICY</b></p><br />
                    As per Airline Reporting Corporation (ARC) guidelines all tickets issued with a numeric ticket number can be cancelled for refund within 24 hours of issuance
                    but agency fees may apply.
                    All tickets issued with a numeric ticket number which do not fall under Airline Reporting Corporation (ARC) are managed by Billing Settlement Plan (BSP)
                    which allows the ticket(s) to be cancelled for a refund the same day before mid-night but agency fees may apply.
                    Cancellations for Low Cost Carriers (LCC) are solely subject to airline rules & restrictions and agency fees may apply.
                    Please note 4% of the total booking cost is the processing fee which stays non-refundable even if the booking is cancelled within 24 hours.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b> BAGGAGE RULES AND FEES</b></p><br />
                    Prices may not baggage fees, hence additional baggage fees may apply. Since prices may vary for different airlines, we recommend that you contact the
                    airline you are travelling with for the accurate information regarding baggage rules, requirements and fees for the specific ticket(s) purchased.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>SEATS</b></p><br />
                    If you have requested to assign a seat, we forward the request airline(s). Airline(s) may or may not be able to confirm your request which is subject to
                    availability. We recommend you to choose our program (Travel Assist+) for specialized seat allocation assistance offered by our dedicated support team.
                    At times airline(s) may not be able to assign specific seats or seats sitting together. Occasionally seats can be assigned only at the check in counter at the
                    airport. Also, airlines possess the right to change any assigned seat as per their policy.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>VALID PHOTO ID</b></p><br />
                    All the valid government photo I.D. should be carried by all travelers in order to board domestic flight(s). If travelling with children less than 2 years old,
                    birth certificate is needed.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>PASSPORT /VISA FOR INTERNATIONAL TRAVEL</b></p><br />
                    All travelers must be in possession of valid travel documents such as ticket, passport, visa and all other entry permits. Your passport must be valid for 6
                    months after your return date. It is solely the responsibility of the traveler to arrange all travel documents needed for the travel. For any visa requirements
                    passenger must confirm with local embassy of the country passenger is visiting or transiting through. Also, some countries may require passengers to be
                    vaccinated for certain diseases or provide a medical document before boarding the flight. We advise passengers must confirm the regulations with the
                    local embassy of the country they are visiting or transiting through. Please note, for certain one way international itineraries, passenger(s) may require a
                    return ticket, we advise all passenger(s) to verify this information with airline or Consulate General to prevent any issues at the time of boarding.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>VOLUNTARY CHANGES</b></p><br />
                    Most ticket(s) issued by The Travel Horse allows for changes but are always subject to airline rules and restrictions. The majority of these itinerary changes
                    requires issuance of new e-ticket number as per airlines policy. All changes are subject to availability, airline rules and regulation, penalties, difference in
                    fare from the original ticket and our administrative service fee. Fares are not guaranteed until the new ticket(s) are issued. Once changed, changes are
                    non-reversible irrespective the new ticket(s) are issued or not and may incur airline penalty or difference in fare. New ticket numbers issued post changes
                    does not qualify for any regulation mentioned in our 24 Hour Policy. As mentioned above airline owns the authority of a ticket and can take it's control at
                    any point, under such circumstances if there may arise any dispute passenger cannot file a law suit against The Travel Horse.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>INVOLUNTARY CHANGES AND CANCELLATIONS (CHANGES AND CANCELLATIONS DONE BY AIRLINES DIRECTLY)</b></p><br />

                    Sometimes airline make changes* involuntarily due to various reasons such as change in flight timings, layover timings, changes in travel date, flight
                    number, departure terminal etc. These changes* are beyond the control of The Travel Horse and we are abide to follow the policy provided by the airlines
                    to cater any request from the passenger(s). Some of these changes* might be last minute changes* and might occur while you are in transit. If you have
                    booked low cost carrier(s), passenger(s) may contact the airline(s) directly. For latest update you can opt for our program (Flight Monitor) to get flight
                    tracking information.
                    Note: * abbreviated for changes and cancellations
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>FARE CHANGE</b></p><br />
                    Prices are not guaranteed until ticketed. The quoted prices are subject to availability. In case you fail to complete the transaction, the fare or the flights
                    offered may differ. A transaction is considered complete when is paid in full and e-tickets are issued.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>ONLINE CHECK IN</b></p><br />
                    In case you want to check in online 24 hours prior to departure of flight and print your boarding pass, you can visit airlines website directly. For certain
                    code share (where operating and marketing carriers are different) itineraries, airlines may allow to check-in only at the airport. It is the sole responsibility
                    of the passenger(s) to arrive at the airport on time (2 hours before departure for domestic trip and 4 hours before departure for international trip) to
                    have sufficient time to clear through security and check-in formalities.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>TSA CARRY-ON RULES</b></p><br />
                    For liquids, aerosols and other restricted items to be carried must follow TSA guideline(s) and airline provision(s). Passenger(s) are advised to check the
                    allowed item listings and their limits on their respective websites to avoid any hassle while boarding.
                </p>
                <p className="pt-8">
                    <p className="pb-1"><b>DISINSECTION</b></p><br />
                    Certain international itineraries are subject to insecticide spraying of cabin prior to a flight or while you are in the aircraft. Federal Law requires passengers
                    to refer to DOT's Disinsection column at www.transportation.gov/airconsumer/spray.
                    For detailed terms and conditions visit our website at www.hmsravels.com/terms
                </p>
            </Box>

        </Stack>
    );
}
