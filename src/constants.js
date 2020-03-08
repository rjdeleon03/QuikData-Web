import firebase from "@/firebase/init";
import M from "materialize-css";
export default {
  ageGroup: ["0 to 5", "6 to 9", "10 to 12", "13 to 17", "18 to 59", "60+"],
  infraType: [
    "School",
    "Church / Place of Worship",
    "Covered Court",
    "Barangay Hall",
    "Barangay Health Station",
    "Evacuation Center",
    "Bridges",
    "Roads",
    "Market",
    "Electricity",
    "Water",
    "Hospital",
    "Seaport / Airport",
    "Communication Lines",
    "Livelihood Facilities",
    "Others"
  ],
  houseType: ["Concrete", "Semi-Concrete", "Light Materials"],
  needsType: [
    "Kitchen Materials",
    "Sleeping Kits",
    "Plastic Sheets / Trapal",
    "Hygiene Kits",
    "House Repair Kits",
    "Clothes",
    "Jerry Can / Water Filter",
    "Others"
  ],
  livelihoodType: [
    "Farming",
    "Fishing",
    "Transportation",
    "Entrepreneurship",
    "Workers"
  ],
  livelihoodSubtype: [
    "Rice",
    "Corn",
    "Vegetables",
    "Fruits",
    "Livestock",
    "Others",
    "Boat",
    "Fishing Equipment",
    "Aquacultures",
    "Others",
    "Jeepney",
    "Tricycle",
    "Van",
    "Others",
    "Employees",
    "Laborers"
  ],
  specialNeedsType: [
    "Pregnant Women",
    "Lactating Mothers",
    "Physically Challenged",
    "Mentally Challenged",
    "Children",
    "Senior Citizens",
    "Infants",
    "Others"
  ],
  evacuationType: [
    "Evacuation Center Building",
    "Multi-Purpose Hall",
    "Church / Place of Worship",
    "School",
    "Gym",
    "Living with Host Family / Friends",
    "Renting an Apartment",
    "Living in Damaged House",
    "Informal Self-Settled Camp",
    "Emergency Shelter / Makeshift House",
    "Squatting",
    "Others"
  ],
  convertDate: dateLong => {
    return new Date(dateLong).toLocaleDateString("en-US");
  },
  convertDateTime: dateTimeLong => {
    const date = new Date(dateTimeLong);
    return (
      date.toLocaleDateString("en-US") +
      " " +
      appendLeadingZeroes(date.getHours()) +
      ":" +
      appendLeadingZeroes(date.getMinutes()) +
      ":" +
      appendLeadingZeroes(date.getSeconds())
    );
  },
  deleteForm: id => {
    const db = firebase.db;
    db.collection("form")
      .doc(id)
      .delete();

    /* General Information */
    db.collection("calamityInfo")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("population")
      .doc(id)
      .delete();
    db.collection("families")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("vulnerable")
      .doc(id)
      .delete();
    db.collection("casualties")
      .doc(id)
      .delete();
    db.collection("causeOfDeath")
      .doc(id)
      .delete();
    db.collection("infrastructureDamage")
      .doc(id)
      .delete();
    /* Shelter Information */
    db.collection("houseDamage")
      .doc(id)
      .delete();
    db.collection("shelterCoping")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("shelterNeeds")
      .doc(id)
      .delete();
    db.collection("shelterAssistance")
      .doc(id)
      .delete();
    db.collection("shelterGaps")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });

    /* Food Security */
    db.collection("foodImpact")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("foodCoping")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("foodNeeds")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("foodAssistance")
      .doc(id)
      .delete();
    db.collection("foodGaps")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });

    /* Livelihoods */
    db.collection("incomeBefore")
      .doc(id)
      .delete();
    db.collection("incomeAfter")
      .doc(id)
      .delete();
    db.collection("estimatedDamage")
      .doc(id)
      .delete();
    db.collection("livelihoodsCoping")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("livelihoodsNeeds")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("livelihoodsAssistance")
      .doc(id)
      .delete();
    db.collection("livelihoodsGaps")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    /* Health */
    db.collection("diseases")
      .doc(id)
      .delete();
    db.collection("specialNeeds")
      .doc(id)
      .delete();
    db.collection("psychosocial")
      .doc(id)
      .delete();
    db.collection("healthCoping")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("healthAssistance")
      .doc(id)
      .delete();
    db.collection("healthGaps")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    /* Wash */
    db.collection("washConditions")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("washCoping")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    db.collection("washAssistance")
      .doc(id)
      .delete();
    db.collection("washGaps")
      .where("formId", "==", id)
      .get()
      .then(doc => {
        if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
      });
    /* Evacuation */
    db.collection("evacuationSites")
      .doc(id)
      .delete();
    /* Case Stories */
    db.collection("caseStories")
      .where("root.formId", "==", id)
      .get()
      .then(doc => {
        if (!doc.docs[0]) return;
        var item = doc.docs[0];
        item
          .data()
          .images.forEach(image =>
            firebase.storage.ref("/images/" + image.id).delete()
          );
        item.ref.delete();
      });
    M.toast({ html: "The DNCA form has been deleted successfully." });
  }
};

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}
