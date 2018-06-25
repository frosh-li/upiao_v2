class Command {
    get getStationData() {
        return `<{"FuncSel":{"Operator":3}}>`;
    }
}

module.exports = new Command();
