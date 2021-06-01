import {NYA_FREE, NYA_UNLIMITED} from '../utils/url_constants'

export const getPlanProperty = (property = 'banner', planId = NYA_UNLIMITED,) => {
  const plan = getPlan(planId) 
  const planBanner = plan ? plan[property] : false ;
  return planBanner
}
//get plan benefits from contentful 
export const getPlanBenefits = (planId = NYA_FREE) => {
  return getPlanProperty('benefits', planId)
}

export const getAllPlanBenefits = (benefitsObj) =>{
  const benefitsData = []
  const sortedBenefits = Object.values(benefitsObj).sort((a,b)=>{
    return a.positionNumber - b.positionNumber
  });
  sortedBenefits.forEach((benefit)=>{
    let neededInfo = {
      benefitID: benefit.id,
      benefitText: benefit.planBenefit, 
      customCheckImages : benefit.customCheckImages ? benefit.customCheckImages : false
    }
    benefitsData.push(neededInfo)
  });
  return benefitsData
}

export const getPlanInfo = (planObj, planId) => {
  let planInformation = Object.values(planObj.plan).find(plan => plan.name === planId) || {}
  let planBenefits = getPlanBenefitList(planInformation.planBenefit) || []
  let headerURL = getHeaderImage(planInformation)
  planInformation.planBenefits = planBenefits
  planInformation.headerURL = headerURL
  return planInformation
}

export const getPlanBenefitList = (benefits) =>{
  let planBenefits = []
  const sortedBenefits = benefits.sort((a,b)=>{
    return a.positionNumber - b.positionNumber
  });
  sortedBenefits.forEach(benefit =>{
    benefit.sys && benefit.fields && planBenefits.push(benefit.fields.planBenefit)
  });
  return planBenefits
}

export const getPlanBenefitsIDs = (benefitsObj=[]) =>{
  let planBenefitsIDs = []
  benefitsObj.forEach(benefit =>{
    benefit.sys && benefit.sys.id && planBenefitsIDs.push(benefit.sys.id)
  });
  return planBenefitsIDs
}

export const getBenefitsPerPlan = plansObj =>{
  let planBenefits = {}
  plansObj.forEach(plan =>{
    planBenefits[plan.name] = plan.planBenefitsIDs
  });
  return planBenefits;
}

export const getHeaderImage = planInformation =>{
  let headerURL = ""
  if (planInformation.planHeaderImage && planInformation.planHeaderImage.fields 
      && planInformation.planHeaderImage.fields.file){
    headerURL = "https:" + planInformation.planHeaderImage.fields.file.url
  }
  return headerURL
}

export const sortPlansAccordingPrice = plans => {
  let sortedPlanInfo = {}
  const sortedPlanArray = Object.values(plans).sort((a,b)=>{
    return a.yearPrice - b.yearPrice
  });
  for(let i = 0 ; i < sortedPlanArray.length; i++ ){
    let plan = sortedPlanArray[i]
    sortedPlanInfo[plan.planName] = plan
  }
  return sortedPlanInfo
}