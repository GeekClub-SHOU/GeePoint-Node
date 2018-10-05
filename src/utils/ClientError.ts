class ClientError extends Error {
    public status: number;
    constructor(props: string, status: number) {
        super(props);
        this.status = status;
    }
}
export default ClientError;
