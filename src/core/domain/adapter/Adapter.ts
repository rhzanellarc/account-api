export default interface Adapter<T, Z> {
    domainToDto(entity: T): Z;
    dtoToDomain(dto: Z): T;
}