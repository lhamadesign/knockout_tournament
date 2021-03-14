import CompetitorForm, { CompetitorFormProps } from '../components/CompetitorForm';

describe("full name field", () => {
    let competitorForm: CompetitorForm;
    let mockCompetitorFormProps: CompetitorFormProps;

    beforeEach(() => {
        mockCompetitorFormProps = {
            submit: () => false
        };
        competitorForm = new CompetitorForm(mockCompetitorFormProps);
    });
    
    test("empty full name input shouldn't be accepted", () => {
        let emptyInput = {value: "", invalid: false};
        expect(competitorForm.validateFullName(emptyInput)).toBeFalsy();
    });
    
    test("invalid character name input shouldn't be acecpted", () => {
        let invalidInput = {value: "Alice#Collins", invalid: false};
        expect(competitorForm.validateFullName(invalidInput)).toBeFalsy();
    });

    test("valid full name input should be accepted", () => {
        let validInput = {value: "Jasmine Van-Den O'Bryan", invalid: false};
        expect(competitorForm.validateFullName(validInput)).toBeTruthy();
    });
});

describe("phone field", () => {
    let competitorForm: CompetitorForm;
    let mockCompetitorFormProps: CompetitorFormProps;

    beforeEach(() => {
        mockCompetitorFormProps = {
            submit: () => false
        };
        competitorForm = new CompetitorForm(mockCompetitorFormProps);
    });
    
    test("empty phone input shouldn't be accepted", () => {
        let emptyInput = {value: "", invalid: false};
        expect(competitorForm.validatePhone(emptyInput)).toBeFalsy();
    });
    
    test("invalid masked phone input shouldn't be acecpted", () => {
        let invalidInput = {value: "(99999-9999", invalid: false};
        expect(competitorForm.validatePhone(invalidInput)).toBeFalsy();
    });

    test("valid phone input should be accepted", () => {
        let validInput = {value: "(11) 98765-4321", invalid: false};
        expect(competitorForm.validatePhone(validInput)).toBeTruthy();
    });
});

describe("email field", () => {
    let competitorForm: CompetitorForm;
    let mockCompetitorFormProps: CompetitorFormProps;

    beforeEach(() => {
        mockCompetitorFormProps = {
            submit: () => false
        };
        competitorForm = new CompetitorForm(mockCompetitorFormProps);
    });
    
    test("empty email input shouldn't be accepted", () => {
        let emptyInput = {value: "", invalid: false};
        expect(competitorForm.validateEmail(emptyInput)).toBeFalsy();
    });
    
    test("invalid masked email input shouldn't be acecpted", () => {
        let invalidInput = {value: "@domain.site.co", invalid: false};
        expect(competitorForm.validateEmail(invalidInput)).toBeFalsy();
    });

    test("valid email input should be accepted", () => {
        let validInput = {value: "address@domain.com", invalid: false};
        expect(competitorForm.validateEmail(validInput)).toBeTruthy();
    });
});