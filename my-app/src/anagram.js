import { dictionary } from './dictionary';

// get the number of times each letter shows up in a given string
function Counter(letters) {
    let array = [...letters];
    var count = {};
    array.forEach(val => count[val] = (count[val] || 0) + 1);
    return count;
  }

const findAnagrams = (letters, regex_pattern, must_contain) => {
    // triple in case there are multiples of the same letter in the answer
    let available_letters = letters + letters + letters;
    available_letters = available_letters.toLowerCase();

    // get the number of times each letter shows up in available letters
    let letters_count = Counter(available_letters);

    // TODO, can we get rid of this?
    if(!regex_pattern){
        regex_pattern = "^.....$"
    }
    regex_pattern = new RegExp(regex_pattern);

    let anagrams = new Set();

    // iterate through each word in the simplified dictionary against requirements
    for(const word of dictionary) {
        // get the letters that are in this word that aren't in the available letters string
        let difference = [...word].filter(x => ![...available_letters].includes(x));
        // only continue processing word if all of its letters are found in the available letters string
        if(difference.length == 0){
            // reject word if it doesn't match the regex pattern
            if(!regex_pattern.test(word)){
                continue;
            }
            // reject word if it doesn't contain all of the must-have letters 
            if(![...must_contain].every(val => [...word].includes(val))){
                continue;
            }
            let check_word = new Set();
            // get the number of times each letter shows up in this word
            let word_counter = Counter(word);
            // for each letter and its count, it show up less than or equal to 
            // the number of times it shows up in the available letters string
            for (const [key, value] of Object.entries(word_counter)) {
                if(value <= letters_count[key]){
                    check_word.add(key);
                }
            }
            // accept the word iff all of its letters were found to be less than or equal to 
            // the counts for the same letters in the available letters string
            if ([...check_word].filter(x => ![...word].includes(x))){
                anagrams.add(word);
            }
        }
    }

    console.log("anagrams:", anagrams);
}

export {
    findAnagrams,
};