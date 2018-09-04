class Command {
    get getStationData() {
        return `<{"FuncSel":{"Operator":3}}>`;
    }

    get getParamterData() {
        return `<{"FuncSel":{"Operator":2}}>`;
    }
}

module.exports = new Command();
