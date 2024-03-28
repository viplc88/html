import cloudscraper from "cloudscraper";
import cheerio from "cheerio";
import express from "express";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const app = express();

app.get("/", async (req, res) => {
    const code = req.query.code;
    const data = await searchByCode(code);
    res.end(JSON.stringify(data));
});

const port = process.env.PORT || 3006;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const searchByCode = async (code) => {
    //cái này tuỳ biến nhé
    const url = code;

    try {
        
        const body = await cloudscraper.get(url);
        return {
            status: 200,
            message: "Success!",
            data: body
        };;
        console.log(code);
    } catch (error) {
        console.log(error)
        return handleError(error);
    }
};

const handleError = (error) => {
    if (error.statusCode == "404") {
        return {
            status: 404,
            message: "Not found!",
        };
    } else if (error.statusCode == "403") {
        return {
            status: 403,
            message: "Forbidden!",
        };
    } else if (error.statusCode == "409") {
        return {
            status: 409,
            message: "Duplicate code!",
        };
    } else {
        return {
            status: 500,
            message: "Internal Server Error!",
        };
    }
};
