import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

import { useAuth } from '@/context/hooks/use-auth';
import AuthService from "@/services/auth-service";
import UserService from "@/services/user-service"; 
import { IUserLogin, IUserRegister, AuthenticationResponse } from '@/commons/types';

import './styles.css';

// Schema de Validação
const registerSchema = yup.object().shape({
    displayName: yup.string().required("O campo nome é de preenchimento obrigatório."),
    cpf: yup.string().required("CPF é obrigatório."),
    telefone: yup.string().required("Telefone é obrigatório."),
    username: yup.string().required("O e-mail é de preenchimento obrigatório.").email("E-mail inválido"),
    password: yup.string()
        .required("Senha obrigatória.")
        .min(8, "Mínimo 8 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, "Deve ter maiúscula, minúscula e número."),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'As senhas não conferem.')
        .required('Confirme sua senha.')
});

const loginSchema = yup.object().shape({
    username: yup.string().required("E-mail é obrigatório."),
    password: yup.string().required("Senha é obrigatória."),
});

interface IRegisterFormInputs {
    displayName: string;
    username: string;
    password: string;
    cpf: string;
    telefone: string;
    confirmPassword: string;
}

export const AuthPage: React.FC = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogin } = useAuth();

    // Captura a página anterior (ex: /checkout/address) ou define a Home como padrão
    const from = location.state?.from?.pathname || location.state?.from || "/";

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsRightPanelActive(true);
        } else {
            setIsRightPanelActive(false);
        }
    }, [location.pathname]);

    // --- CADASTRO ---
    const { 
        control: regControl, 
        handleSubmit: handleReg, 
        formState: { errors: regErrors, isSubmitting: isRegSub }, 
        reset: resetReg 
    } = useForm<IRegisterFormInputs>({ 
        resolver: yupResolver(registerSchema),
        defaultValues: { displayName: '', username: '', cpf: '', telefone: '', password: '', confirmPassword: '' }
    });
    
    const onRegister = async (data: IRegisterFormInputs) => {
        try {
            const userData: IUserRegister = {
                displayName: data.displayName,
                username: data.username,
                password: data.password,
                cpf: data.cpf,
                telefone: data.telefone
            };

            const response = await UserService.signup(userData);

            if (response.success) {
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada! Entrando...', life: 2000 });
                
                // AUTO-LOGIN
                try {
                    const loginResponse = await AuthService.login({ 
                        username: data.username, 
                        password: data.password 
                    });
                    
                    if (loginResponse.success && loginResponse.data) {
                        handleLogin(loginResponse.data as AuthenticationResponse);
                        // Redireciona para onde o usuário estava antes (ex: checkout)
                        setTimeout(() => navigate(from, { replace: true }), 1000);
                    }
                } catch (loginError) {
                    resetReg();
                    setIsRightPanelActive(false);
                    toast.current?.show({ severity: 'info', summary: 'Login', detail: 'Faça login com sua nova conta.' });
                }
            } else {
                const msg = response.message || 'Falha ao criar conta.';
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 });
            }
        } catch { 
            toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro no servidor.', life: 3000 }); 
        }
    };

    // --- LOGIN ---
    const { control: logControl, handleSubmit: handleLog, formState: { errors: logErrors, isSubmitting: isLogSub } } = useForm<IUserLogin>({ resolver: yupResolver(loginSchema) });

    const onLogin = async (data: IUserLogin) => {
        try {
            const response = await AuthService.login(data);
            if (response.success && response.data) {
                handleLogin(response.data as AuthenticationResponse);
                toast.current?.show({ severity: 'success', summary: 'Bem-vindo', detail: 'Login realizado!', life: 3000 });
                // Redireciona para onde o usuário estava antes
                setTimeout(() => navigate(from, { replace: true }), 500);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Credenciais inválidas.', life: 3000 });
            }
        } catch { toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro no servidor.', life: 3000 }); }
    };

    return (
        <div className={`auth-page-container ${isRightPanelActive ? "right-panel-active" : ""}`}>
            <Toast ref={toast} />
            
            <div className="auth-card">
                
                {/* PAINEL DE CADASTRO */}
                <div className="form-wrapper sign-up-wrapper">
                    <form className="auth-form-content" onSubmit={handleReg(onRegister)}>
                        <h2 className="auth-title-second">Criar uma Conta</h2>
                        
                        <div className="social-container">
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-facebook-f"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-google"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-linkedin-in"></i></div></a>
                        </div>
                        <p className="description-second">Ou utilize seu email para o cadastro</p>

                        <div className="w-full flex flex-column gap-2 my-3 text-left">
                            <label>Nome</label>
                            <Controller name="displayName" control={regControl} render={({ field }) => (
                                <InputText {...field} placeholder="Nome Completo" className={classNames("input-field", { 'p-invalid': regErrors.displayName })} />
                            )} />
                            {regErrors.displayName && <small className="error-msg">{regErrors.displayName.message}</small>}

                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label>CPF</label>
                                    <Controller name="cpf" control={regControl} render={({ field }) => (
                                        <InputMask {...field} mask="999.999.999-99" placeholder="CPF" className={classNames("input-field", { 'p-invalid': regErrors.cpf })} />
                                    )} />
                                    {regErrors.cpf && <small className="error-msg">{regErrors.cpf.message}</small>}
                                </div>
                                <div className="flex-1">
                                    <label>Telefone</label>
                                    <Controller name="telefone" control={regControl} render={({ field }) => (
                                        <InputMask {...field} mask="(99) 99999-9999" placeholder="Telefone" className={classNames("input-field", { 'p-invalid': regErrors.telefone })} />
                                    )} />
                                    {regErrors.telefone && <small className="error-msg">{regErrors.telefone.message}</small>}
                                </div>
                            </div>

                            <label>Email</label>
                            <Controller name="username" control={regControl} render={({ field }) => (
                                <InputText {...field} placeholder="Email" className={classNames("input-field", { 'p-invalid': regErrors.username })} />
                            )} />
                            {regErrors.username && <small className="error-msg">{regErrors.username.message}</small>}

                            <label>Senha</label>
                            <Controller name="password" control={regControl} render={({ field }) => (
                                <Password {...field} feedback={false} placeholder="Senha" toggleMask className={classNames({ 'p-invalid': regErrors.password })} inputClassName="input-field" />
                            )} />
                            {regErrors.password && <small className="error-msg">{regErrors.password.message}</small>}

                            <label>Confirmar Senha</label>
                            <Controller name="confirmPassword" control={regControl} render={({ field }) => (
                                <Password {...field} feedback={false} placeholder="Repita sua senha" toggleMask className={classNames({ 'p-invalid': regErrors.confirmPassword })} inputClassName="input-field" />
                            )} />
                            {regErrors.confirmPassword && <small className="error-msg">{regErrors.confirmPassword.message}</small>}
                        </div>

                        <button className="btn-second" disabled={isRegSub}>CADASTRAR</button>
                    </form>
                </div>

                {/* PAINEL DE LOGIN */}
                <div className="form-wrapper sign-in-wrapper">
                    <form className="auth-form-content" onSubmit={handleLog(onLogin)}>
                        <h2 className="auth-title-second">Entrar</h2>
                        <div className="social-container">
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-facebook-f"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-google"></i></div></a>
                            <a href="#" className="social-link"><div className="social-item"><i className="fab fa-linkedin-in"></i></div></a>
                        </div>
                        <p className="description-second">Ou utilize seu email para o seu login</p>

                        <div className="w-full flex flex-column gap-3 my-4 text-left">
                            <label>Email</label>
                            <Controller name="username" control={logControl} render={({ field }) => (
                                <InputText {...field} placeholder="Email" className={classNames("input-field", { 'p-invalid': logErrors.username })} />
                            )} />
                            {logErrors.username && <small className="error-msg">{logErrors.username.message}</small>}

                            <label>Senha</label>
                            <Controller name="password" control={logControl} render={({ field }) => (
                                <Password {...field} feedback={false} placeholder="Senha" toggleMask className={classNames({ 'p-invalid': logErrors.password })} inputClassName="input-field" />
                            )} />
                            {logErrors.password && <small className="error-msg">{logErrors.password.message}</small>}
                        </div>

                        <a href="#" style={{fontSize: '14px', color: '#333', marginTop: '15px', textDecoration: 'none'}}>Esqueceu sua senha?</a>
                        <button className="btn-second" disabled={isLogSub}>ENTRAR</button>
                    </form>
                </div>

                {/* OVERLAY */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h2 className="auth-title-primary">Bem Vindo!</h2>
                            <p className="description-primary">Já tem conta?</p>
                            {/* AQUI ESTAVA O PROBLEMA: Agora passamos o state (histórico) ao navegar */}
                            <button 
                                className="btn-primary" 
                                onClick={() => { 
                                    setIsRightPanelActive(false); 
                                    navigate('/login', { state: location.state }); 
                                }}
                            >
                                ENTRAR
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h2 className="auth-title-primary">Olá, Amigo!</h2>
                            <p className="description-primary">Cadastre-se agora</p>
                            {/* AQUI TAMBÉM: Passamos o state ao ir para o registro */}
                            <button 
                                className="btn-primary" 
                                onClick={() => { 
                                    setIsRightPanelActive(true); 
                                    navigate('/register', { state: location.state }); 
                                }}
                            >
                                CADASTRAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};