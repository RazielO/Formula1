import type { LayoutData, RouteParams } from "../$types";

export const load: LayoutData = ({ params }: { params: RouteParams }) => {
    return {
        year: parseInt(params.year),
        round: parseInt(params.round)
    }
};