export interface IJob {
	id: number;
	reference: string;
	name: string;
	slug: string;
	description: string;
	published_at: Date;
	created_at: CreatedAt;
	office: IOffice;
	department: Department;
	contract_type: ContractType;
	profile: string;
	recruitment_process: string;
	salary: Salary;
	cms_sites_references: string[];
	websites_urls: WebsitesUrl[];
}

export type GroupedJobs = Record<string, IJob[]>;

interface CreatedAt {
	fr: string;
	en: string;
}

interface Country {
	fr: string;
	en: string;
}

export interface IOffice {
	id: number;
	name: string;
	address: string;
	zip_code: string;
	district: string;
	city: string;
	country: Country;
}

interface Department {
	id: number;
	name: string;
}

interface ContractType {
	fr: string;
	en: string;
	es: string;
	cs: string;
	sk: string;
}

interface Salary {
	min?: any;
	max?: any;
	currency: string;
	period: string;
}

interface WebsitesUrl {
	website_reference: string;
	url: string;
}

export enum GroupBy {
	NONE = 'NONE',
	OFFICE_NAME = 'OFFICE_NAME',
	DEPARTMENT_NAME = 'DEPARTMENT_NAME',
}
