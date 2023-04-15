// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  //@@@@@@@@@@@@@@@@@    pAequorFactory   Function  start  @@@@@@@@@@@@@@@@@@@@@@
  const pAequorFactory = (num, array) => {
    return {
      specimenNum: num,
      dna: array,
      //################# mutate  ##############################
      mutate() {
        const randomNumber = Math.floor(Math.random() * 15);
        const baseLetterToChange = this.dna[randomNumber];
        let randomBase = returnRandBase();
        while (baseLetterToChange === randomBase) {
          randomBase = returnRandBase();
        }
        this.dna[randomNumber] = randomBase;
        return this.dna;
      },
      //################# compareDNA  ##############################
      compareDNA(pAequorObj) {
        //compare current dna with passed dna
        //compute how many bases are identical and same location
        let identicalBases = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === pAequorObj.dna[i]) {
            identicalBases++;
          }
        }
        const dnaIdenticalPercentage = Math.floor((100 * identicalBases) / 15);
        return `specimen ${this.specimenNum} and specimen ${pAequorObj.specimenNum} have ${dnaIdenticalPercentage}% DNA in common`;
      },
      //################# willLikelySurvive  ##############################
      willLikelySurvive() {
        let basesCGInDNA = 0;
        for (const base of this.dna) {
          if (base === "C" || base === "G") {
            basesCGInDNA++;
          }
        }
        const percentageOfBasesCGInDNA = Math.floor((100 * basesCGInDNA) / 15);
        return percentageOfBasesCGInDNA >= 60 ? true : false;
      },
    };
  };
  //###########################   create 30 instances that would survive  start ##############
  let toStudy30Instances = [];
  for (let i = 0; i < 30; i++) {
    let pAequorObject = pAequorFactory(i, mockUpStrand());
    while (!pAequorObject.willLikelySurvive()) {
      pAequorObject = pAequorFactory(i, mockUpStrand());
    }
    toStudy30Instances.push(pAequorObject);
  }
  console.log(toStudy30Instances);
  //#####################   create 30 instances that would survive  finish ##############
  