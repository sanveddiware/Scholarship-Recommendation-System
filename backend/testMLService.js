const {
    searchScholarships
} = require("./services/mlService");

const test = async () => {
    try {
        const result = await searchScholarships(
            "engineering student from Maharashtra looking for scholarship"
        );

        console.log(
            JSON.stringify(result, null, 2)
        );
    } catch (error) {
        console.error(error.message);
    }
};

test();