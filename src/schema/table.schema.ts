const dynamoose = require('dynamoose');

export enum Tables {
    WashroomTable = "WashroomTable",
    WashroomTable_XYIndex = "XYIndex",
    TestTable = "TestTable"
}

export const WashroomTable = new dynamoose.Schema(
    {   
        id: {
            type: String,
            required: true,
            hashKey: true
        },
        X_COORDINATE: {
            type: Number,
            required: true,
            index: {
                name: Tables.WashroomTable_XYIndex,
                rangeKey: "Y_COORDINATE",
                project: ['X_COORDINATE','Y_COORDINATE','id']
            }
        },
        Y_COORDINATE: {
            type: Number,
            required: true,
        },
        NAME: {
            type: String,
            required: true,
        },
        ADDRESS: {
            type: String,
            required: true,
        },
        HOUR_OPEN: {
            type: String,

        },
        HOUR_CLOSE: {
            type: String
        },
        UPVOTES: {
            type: Number,
            default: 0,
        },
        DOWNVOTES: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)