import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { getResumeById, updateResumeToDB } from '../../store/resume/actions';
import { resumeSelector } from '../../store/resume/reducer';
import { removeEmptyOrNullKeyValueFromObject } from '../../helpers';
import type { IProfil } from '../../types/store';

export const useResume = () => {
	const resume = useAppSelector(resumeSelector);
	const location = useLocation();

	useEffect(() => {
		if (resume !== null || !location.state?.resumeId) {
			return;
		}
		const { resumeId } = location.state;
		getResumeById(resumeId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resume]);

	const resumeProfil = useMemo(() => {
		return {
			position: resume?.profil?.position,
			introduction: resume?.profil?.introduction,
			portfolio: resume?.profil?.portfolio,
			socialMedias: resume?.profil?.socialMedias,
			education: {
				academy: resume?.profil?.education?.academy,
				period: resume?.profil?.education?.period,
				certificate: resume?.profil?.education?.certificate,
			},
		};
	}, [resume]);

	const resumeTitle = useMemo((): string | undefined => {
		return resume?.title;
	}, [resume?.title]);

	const updateResumeProfilToDB = (profil: IProfil): { isSucces: boolean } => {
		if (!resume?.userId) {
			return { isSucces: false };
		}
		const profilFiltred: IProfil | undefined =
			removeEmptyOrNullKeyValueFromObject(profil);

		if (!profilFiltred) {
			return { isSucces: false };
		}
		profilFiltred && updateResumeToDB({ ...resume, profil: profilFiltred });
		return { isSucces: true };
	};

	return {
		resume,
		resumeTitle,
		resumeProfil,
		updateResumeProfilToDB,
	};
};
