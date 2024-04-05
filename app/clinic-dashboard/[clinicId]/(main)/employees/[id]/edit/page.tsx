
import NewEmployeePage from '../../new/page'

export default function page({ params }: { params: { id: string } }) {
    return NewEmployeePage({ employeeId: params.id });
}
