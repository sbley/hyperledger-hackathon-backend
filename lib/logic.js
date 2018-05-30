/* Make an application
 * @param {org.saxonia.employee.Apply} apply - the apply
 * @transaction
 */
async function Apply(apply) {
 /*make sure employee selected the right state*/
 let state = apply.application.state;
  if(state !== 'PENDING'){
    throw new Error('You are not allowed to set the state different then pending!');
  }
}
 /*catch wrong activity IDs*/
 /*const assetRegistry = await getAssetRegistry('org.saxonia.employee.Application');
 let actID = participation.actID;
 if(assetRegistry.exists(actID) !== true){
 	 throw new Error('There is no activity with this actID!');
 };*/
 
 /*catch wrong employee emails*/
 /*const employeeRegistry = await getParticipantRegistry('org.saxonia.employee.Employee');
 let email = participation.participant.email;
 if(employeeRegistry.exists(email) !== true){
 	 throw new Error('There is no employee with this email!');
 };*/
  
 /*catch state errors*/ 
 /*let state = participation.state;
 if(state !== 'PENDING'){
 	 throw new Error('You are not allowed do approve or reject a participation request!');
 };
}*/

  
  
  
  
/**
 * Decide about an "application" for a Participation
 * @param {org.saxonia.employee.Decide_Application} decide_application - the decide_application
 * @transaction
 */
async function Decide_Application(decide_application) {
 let application = decide_application.application;
 let employee = application.participant;
 let teamleader = employee.teamleader;
 let amount = application.activity.credits;
 let state = decide_application.state;
  
 if (state === 'APPROVED'){
   	application.state = 'APPROVED';
 	/*Employee gets Credits/pays Credits*/
  	if (amount >= 0){
    	if( teamleader.balance >= amount){
			teamleader.balance -= amount;
   			employee.balance += amount;
  		}else{
       	throw new Error('Teamleader has not enough credits!');     
    	}
  	}else{
    	if( employee.balance >= amount){
   			employee.balance += amount;
  		}else{
      	throw new Error('Employee has not enough credits!');
    	}
  	}
 } else if(state === 'REJECTED'){
  application.state = 'REJECTED'; 
 }
 
 const applicationRegistry = await getAssetRegistry('org.saxonia.employee.Application');
 await applicationRegistry.update(application);
 const teamleaderRegistry = await getParticipantRegistry('org.saxonia.employee.Teamleader');
 await teamleaderRegistry.update(teamleader);
 const employeeRegistry = await getParticipantRegistry('org.saxonia.employee.Employee');
 await employeeRegistry.update(employee);
}

/**
 * Give Teamleader Credits
 * @param {org.saxonia.employee.Give_TL_Credits} give_tl_credits - the give_tl_credits
 * @transaction
 */
async function Give_TL_Credits(give_tl_credits) {
  let executive = give_tl_credits.executive;
  let teamleader = give_tl_credits.teamleader;
  let amount = give_tl_credits.amount;
 	 if (executive.balance > 0 && executive.balance >= amount){
       teamleader.balance += amount;
       executive.balance -= amount;
     }
  
  const teamleaderRegistry = await getParticipantRegistry('org.saxonia.employee.Teamleader');
  await teamleaderRegistry.update(teamleader);
  const executiveRegistry = await getParticipantRegistry('org.saxonia.employee.Executive');
  await executiveRegistry.update(executive);
}

/*
*Testfall Johannes-> zieht Kredit fÃ¼r Urlaub, Gehalt, Event ab
*Creditabzug nach EinlÃ¶sung
*Status APPLY_HOLYDAY APPLY_SALARY APPLY_EVENT hinzugefÃ¼gt
*Teamleader Punktestand wird abgezogen
*/

/**
 * Make an "application" for a Participation
 * @param {org.saxonia.employee.Deduction_Reward} participation - the participation
 * @transaction
 */
/*async function Deduction_Reward (participation) {
 let employee = participation.participant;
 let amount = participation.activity.credits;
 let state = participation.state;*/

  /*evetuell Überprüfung ob genehmigt*/
 /* if( employee.balance >= amount){
  	if (state == 'APPLY_HOLYDAY' || 'APPLY_SALARY' || 'APPLY_EVENT'){
   		employee.balance -= amount;
    }
  }*/
  /* const employeeRegistry = await getParticipantRegistry('org.saxonia.employee.Employee');
  await employeeRegistry.update(employee);*/

  /*const employeeRegistry = await getParticipantRegistry('org.saxonia.employee.Employee');
  await employeeRegistry.update(employee);
}*/

/*
*Testfall Max-> Bestellung mit Einkauf
*/

/**
 * Make an "application" for a Participation
 * @param {org.saxonia.employee.Purchase_Selling} participation - the participation
 * @transaction
 */
async function Purchase_Selling (participation) {
 let employee = participation.participant;
 let amount = participation.activity.credits;
 let state = participation.state;

  
  if( employee.balance >= amount){
  	if (state == 'ORDER'){
   		employee.balance += amount;
    }      
    
  }
  const employeeRegistry = await getParticipantRegistry('org.saxonia.employee.Employee');
  await employeeRegistry.update(employee);
}